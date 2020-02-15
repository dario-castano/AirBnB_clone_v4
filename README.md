<img src="https://github.com/jarehec/AirBnB_clone_v3/blob/master/dev/HBTN-hbnb-Final.png" width="160" height=auto/>

# AirBnB Clone: Phase # 3

## Description

Project attempts to clone the the AirBnB application and website, including the
Database, storage, RESTful API, Web Framework, and Front End.  Currently the
application is designed to run with 2 storage engine models:

* File Storage Engine:

  * `/models/engine/file_storage.py`

* Database Storage Engine:

  * `/models/engine/db_storage.py`

  * To Setup the Database for testing and development, there are 2 setup
  scripts that setup a Database with certain privileges: `setup_mysql_test.sql`
  & `setup_mysql_test.sql` (for more on setup, see below).

  * The Database uses Environmental Variables for tests, to execute tests with the environmental variables prepend these declarations to the execution command:

```Bash
$ HBNB_MYSQL_USER=hbnb_test HBNB_MYSQL_PWD=hbnb_test_pwd \
HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_test_db HBNB_TYPE_STORAGE=db \
[COMMAND HERE]
```

## Environment

* __OS:__ Ubuntu 14.04 LTS
* __Language:__ Python 3.4.3
* __Web server:__ nginx/1.4.6
* __Application server:__ Flask 0.12.2, Jinja2 2.9.6
* __Web server gateway:__ gunicorn (version 19.7.1)
* __Database:__ mysql Ver 14.14 Distrib 5.7.18
* __Documentation:__ Swagger (flasgger==0.6.6)
* __Style:__
  * __Python:__ PEP 8 (v. 1.7.0)
  * __Web static:__ [W3C Validator](https://validator.w3.org/)
  * __bash:__ ShellCheck 0.3.3

<img src="https://github.com/jarehec/AirBnB_clone_v3/blob/master/dev/hbnb_step5.png"/>

## Configuration Files

The `/config/` directory contains configuration files for `nginx` and the
Upstart scripts.  The nginx configuration file is for the configuration file in
the path: `/etc/nginx/sites-available/default`.  The enabled site is a sym link
to that configuration file.  The upstart script should be saved in the path:
`/etc/init/[FILE_NAME.conf]`. To begin this service, execute:

`$ sudo start airbnb.conf`
This script's main task is to execute the following `gunicorn` command:

`$ gunicorn --bind 127.0.0.1:8001 wsgi.wsgi:web_flask.app`

The `gunicorn` command starts an instance of a Flask Application.

---

### Web Server Gateway Interface (WSGI)

All integration with gunicorn occurs with `Upstart` `.conf` files.  The python
code for the WSGI is listed in the `/wsgi/` directory.  These python files run
the designated Flask Application.

## Setup

This project comes with various setup scripts to support automation, especially
during maintanence or to scale the entire project.  The following files are the
setupfiles along with a brief explanation:

* **`dev/setup.sql`:** Drops test and dev Databases, and then reinitializes
the Database.

  * Usage: `$ cat dev/setup.sql | mysql -uroot -p`

* **`setup_mysql_dev.sql`:** initialiezs dev Database with mysql for testing

  * Usage: `$ cat setup_mysql_dev.sql | mysql -uroot -p`

* **`setup_mysql_test.sql`:** initializes test Database with mysql for testing

  * Usage: `$ cat setup_mysql_test.sql | mysql -uroot -p`

* **`0-setup_web_static.sh`:** sets up nginx web server config file & the file
  structure.

  * Usage: `$ sudo ./0-setup_web_static.sh`

* **`3-deploy_web_static.py`:** uses 2 functions from (1-pack_web_static.py &
  2-do_deploy_web_static.py) that use the fabric3 python integration, to create
  a `.tgz` file on local host of all the local web static fils, and then calls
  the other function to deploy the compressed web static files.
  The script must be executed from the `AirBnB_clone` root directory.

  * Usage: `$ fab -f 3-deploy_web_static.py deploy -i ~/.ssh/holberton -u ubuntu`

## Testing

### `unittest`

This project uses the `unittest` python library, to run tests on all python files.
All unittests are in the `./tests` directory with the command:

* File Storage Engine Model:

  * `$ python3 -m unittest discover -v ./tests/`

* Database Storage Engine Model

```Bash
$ HBNB_MYSQL_USER=hbnb_test HBNB_MYSQL_PWD=hbnb_test_pwd \
HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_test_db HBNB_TYPE_STORAGE=db \
python3 -m unittest discover -v ./tests/
```

---

### All Tests

The bash script `init_test.sh` executes all these tests for both File Storage & Database Engine Models:

* Checks `pep8` style

* Runs all unittests

* Runs all w3c_validator tests

* Cleans up all `__pycache__` directories and the storage file, `file.json`

* **Usage `init_test.sh`:**

```Bash
$ ./dev/init_test.sh
OK
```

---

### CLI Interactive Tests

* This project uses the `cmd` python library,  to run tests in an interactive command
  line interface.  To begin tests with the CLI, run this script:

#### File Storage Engine Model

```Bash
$ ./console.py
(hbnb)
```

#### How to execute the CLI using the Database Storage Engine Model

```Bash
$ HBNB_MYSQL_USER=hbnb_test HBNB_MYSQL_PWD=hbnb_test_pwd \
HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_test_db HBNB_TYPE_STORAGE=db \
./console.py
```

#### For a detailed description of all tests, run these commands in the CLI

```Bash
(hbnb) help help
List available commands with "help" or detailed help with "help cmd".
(hbnb) help

Documented commands (type help <topic>):
========================================
Amenity    City  Place   State  airbnb  create   help  show
BaseModel  EOF   Review  User   all     destroy  quit  update

(hbnb) help User
class method with .function() syntax
        Usage: User.<command>(<id>)
(hbnb) help create
create: create [ARG] [PARAM 1] [PARAM 2] ...
        ARG = Class Name
        PARAM = <key name>=<value>
                value syntax: "<value>"
        SYNOPSIS: Creates a new instance of the Class from given input ARG
                  and PARAMS. Key in PARAM = an instance attribute.
        EXAMPLE: create City name="Chicago"
                 City.create(name="Chicago")
```

* Tests in the CLI may also be executed with this syntax:

  * **destroy:** `<class name>.destroy(<id>)`

  * **update:** `<class name>.update(<id>, <attribute name>, <attribute value>)`

  * **update with dictionary:** `<class name>.update(<id>, <dictionary representation>)`

---

### Continuous Integration Tests

Uses [Travis-CI](https://travis-ci.org/) to run all tests on all commits to the
github repo

## Authors

* **MJ Johnson** - [@mj31508](https://github.com/mj31508)
* **David John Coleman II** - [davidjohncoleman.com](http://www.davidjohncoleman.com/) - [@djohncoleman](https://twitter.com/djohncoleman)
* **Kimberly Wong** - [kjowong](https://github.com/kjowong) - [@kjowong](https://twitter.com/kjowong) - [kjowong@gmail.com](kjowong@gmail.com)
* **Carrie Ybay** - [hicarrie](https://github.com/hicarrie) - [@hicarrie_](https://twitter.com/hicarrie_)
* **Jared Heck** - [jarehec](https://github.com/jarehec) - [@jarehec](https://twitter.com/jarehec)
* **Nicolas Forero Puello** - [NickForero11](https://github.com/NickForero11) - [@F0R3R0X](https://twitter.com/f0R3R0X)
* **Hernan Dario Castaño Rueda** - [dario-castano](https://github.com/dario-castano) - [@Astrolimonada](https://twitter.com/Astrolimonada)

## License

MIT License

Copyright (c) 2020 Nicolas Forero, Dario Castaño, MJ Johnson, David John Coleman II, Kimberly Wong, Carrie Ybay, Jared Heck.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
