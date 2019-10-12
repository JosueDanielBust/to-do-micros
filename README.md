To-Do App - Micros
---

Requirements
--
- MySQL
- NodeJS

Installation - Step by Step
--
1. Install Users micro
``` bash
$ cd users && npm install
```
2. Install Tasks micro
``` bash
$ cd tasks && npm install
```
3. Install UI Micro
``` bash 
$ cd ui && npm install
```
4. Open MySQL and run db.sql
``` bash
$ mysql
myslq> source db.sql
```

Installation - Script
--
1. Run the install.sh script on root path
``` bash
$ sh ./install.sh
```
2. Open MySQL and run db.sql
``` bash
$ mysql
myslq> source db.sql
```

License
--
MIT License

Copyright (c) 2019 Josue Daniel Bustamante

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.