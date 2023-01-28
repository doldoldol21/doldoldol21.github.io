---
layout: post
title: MSSQL 테이블 크기 확인하기
subtitle: table size check in mssql!
# cover-img: /assets/img/cover2.jpg
thumbnail-img: ''
comments: true
tags: [MSSQL, Table, 기록]
last-updated: 2021-08-13
---

이번엔 테이블의 용량 확인하는 방법에 대해 말해볼게요!

DB의 용량관리를 위해 거의 필수적으로 테이블의 용량을 확인하고 필요한 조치를 취해줘야하는데요.

특히 **Express**
버전을 사용중인 분이시라면 DB의 용량제한이 10GB 이기때문에 더 자주 확인해줘야 할 상황이 생겨요.

자세한 버전 별 차이는 [mssql 버전 별 비교](https://docs.microsoft.com/ko-kr/sql/sql-server/editions-and-components-of-sql-server-version-15?view=sql-server-ver15)
를 참고해주세요.😉

테이블의 용량을 확인하는 쿼리에요.

```sql
USE DB_Name

SELECT t.name AS tablename,
	   s.name AS schemaname,
	   p.rows AS rowcounts,
	   SUM(a.total_pages) * 8 AS totalspacekb,
	   CAST(ROUND(((SUM(a.total_pages) * 8) / 1024.00), 2) AS NUMERIC(36, 2)) AS totalspacemb,
	   SUM(a.used_pages) * 8 AS usedspacekb,
	   CAST(ROUND(((SUM(a.used_pages) * 8) / 1024.00), 2) AS NUMERIC(36, 2)) AS usedspacemb,
	   (SUM(a.total_pages) - SUM(a.used_pages)) * 8 AS unusedspacekb,
	   CAST(ROUND(((SUM(a.total_pages) - SUM(a.used_pages)) * 8) / 1024.00, 2) AS NUMERIC(36, 2)) AS unusedspacemb
FROM sys.tables t
INNER JOIN sys.indexes i
ON t.object_id = i.object_id
INNER JOIN sys.partitions p
ON i.object_id = p.object_id AND i.index_id = p.index_id
INNER JOIN sys.allocation_units a
ON p.partition_id = a.container_id
LEFT OUTER JOIN sys.schemas s
ON t.schema_id = s.schema_id
WHERE t.name NOT LIKE 'sys%'
AND t.is_ms_shipped = 0
AND i.object_id > 255
GROUP BY t.name, s.name, p.rows
ORDER BY usedspacemb DESC
```

DB_Name 대신 확인해야하는 DB의 이름을 넣어주시면 됩니다😀

출처: <https://stackoverflow.com/questions/3606366/how-to-find-the-size-of-a-table-in-sql>
, [kairan](https://stackoverflow.com/users/1342249/kairan)
