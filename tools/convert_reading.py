#!/usr/bin/env python3
"""从 vuepress1 分支的 read/*.md markdown 表格生成 data/reading/*.toml

表格格式因年份不同：
  2015-2018: 编号 | 书名 | 开始日期 | 结束日期 | 状态
  2019:      编号 | 书名 | 读书方式
  2020:      编号 | 书名 | 开始日期 | 结束日期 | 读书方式 | 评分 | 笔记
"""
import re
import subprocess
import os
import tomli_w  # pip install tomli-w

YEARS = [2015, 2016, 2017, 2018, 2019, 2020]


def get_md_from_git(year):
    result = subprocess.run(
        ["git", "show", f"vuepress1:page/read/{year}.md"],
        capture_output=True, text=True, check=True
    )
    return result.stdout


def parse_links(text):
    links = {}
    for m in re.finditer(r'^\[([^\]]+)\]:\s*(\S+)', text, re.MULTILINE):
        links[m.group(1)] = m.group(2)
    return links


def parse_title_cell(cell, links):
    cell = cell.strip()
    # [书名][ref] 格式
    m = re.match(r'\[(.+?)\]\[([^\]]+)\]', cell)
    if m:
        return m.group(1).strip(), links.get(m.group(2), '')
    # [书名](url) 格式
    m = re.match(r'\[(.+?)\]\((.+?)\)', cell)
    if m:
        return m.group(1).strip(), m.group(2).strip()
    # 纯文本
    return cell, ''


def parse_note_and_rating(status_cell, links):
    note_url = ''
    m = re.search(r'\[读书笔记\]\[([^\]]+)\]', status_cell)
    if m:
        note_url = links.get(m.group(1), '')
        status_cell = re.sub(r'\s*\[读书笔记\]\[[^\]]+\]', '', status_cell).strip()
    # 也处理 [读书笔记：...](url) 格式
    m2 = re.search(r'\[读书笔记[^\]]*\]\(([^)]+)\)', status_cell)
    if m2:
        note_url = m2.group(1)
        status_cell = re.sub(r'\[读书笔记[^\]]*\]\([^)]+\)', '', status_cell).strip()
    rating = ''.join(c for c in status_cell if c == '⭐').strip()
    return rating, note_url


def split_row(line):
    """将 markdown 表格行分割为列，使用 [1:-1] 避免 strip('|') 吃掉空尾列"""
    parts = line.split('|')
    if len(parts) < 3:
        return []
    return [c.strip() for c in parts[1:-1]]


def parse_table(text, links, year):
    books = []
    for line in text.splitlines():
        line = line.strip()
        if not line.startswith('|'):
            continue
        cols = split_row(line)
        if not cols:
            continue
        # 跳过分隔行
        if re.match(r'^[-:]+$', cols[0]):
            continue
        # 跳过表头
        if cols[0] in ('编号', ''):
            continue
        try:
            book_id = int(cols[0])
        except ValueError:
            continue

        title, url = parse_title_cell(cols[1] if len(cols) > 1 else '', links)

        if year == 2019:
            # 3列格式：编号 | 书名 | 读书方式
            method = cols[2].strip() if len(cols) > 2 else ''
            books.append({
                'id': book_id,
                'title': title,
                'url': url,
                'start': '',
                'end': '',
                'method': method,
                'rating': '',
                'note_url': '',
            })
        elif year == 2020:
            # 7列格式：编号 | 书名 | 开始日期 | 结束日期 | 读书方式 | 评分 | 笔记
            start = cols[2].strip() if len(cols) > 2 else ''
            end = cols[3].strip() if len(cols) > 3 else ''
            method = cols[4].strip() if len(cols) > 4 else ''
            rating_raw = cols[5].strip() if len(cols) > 5 else ''
            note_raw = cols[6].strip() if len(cols) > 6 else ''
            # 评分是数字
            rating = rating_raw
            # 读书笔记可能是 [文字](url)
            note_url = ''
            m = re.search(r'\[([^\]]+)\]\(([^)]+)\)', note_raw)
            if m:
                note_url = m.group(2)
            books.append({
                'id': book_id,
                'title': title,
                'url': url,
                'start': start,
                'end': end,
                'method': method,
                'rating': rating,
                'note_url': note_url,
            })
        else:
            # 5列格式：编号 | 书名 | 开始日期 | 结束日期 | 状态
            start = cols[2].strip() if len(cols) > 2 else ''
            end = cols[3].strip() if len(cols) > 3 else ''
            status = cols[4].strip() if len(cols) > 4 else ''
            rating, note_url = parse_note_and_rating(status, links)
            books.append({
                'id': book_id,
                'title': title,
                'url': url,
                'start': start,
                'end': end,
                'rating': rating,
                'note_url': note_url,
            })
    return books


os.makedirs('data/reading', exist_ok=True)

for year in YEARS:
    print(f"Processing {year}...")
    text = get_md_from_git(year)
    links = parse_links(text)
    books = parse_table(text, links, year)
    data = {'year': year, 'books': books}
    with open(f'data/reading/{year}.toml', 'wb') as f:
        tomli_w.dump(data, f)
    print(f"  {len(books)} books written to data/reading/{year}.toml")
