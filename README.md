Geologist
=============

Geologist allows you to talk to your minecraft server using HTTP. Get stats and issue rcon commands via a clean HTTP interface.

Install
-------------

```bash
npm install -g geologist
```

Usage
------------

You'll need to provide geologist a few pieces of information to start it.

```bash
geologist
usage: geologist --port [port] --minecrafthost [host] --queryport [query port] --rconport [rcon port] --rconpassword [rcon password]

Options:
  --port           [required]
  --minecrafthost  [required]
  --queryport      [required]
  --rconport       [required]
  --rconpassword   [required]
```

* port - The port on which geologist will listen.
* minecrafthost - The host of your minecraft server. I recommend running geologist on the same physical machine and passing 'localhost' for this parameter.
* queryport - The query port for your minecraft server. Look for the line 'query.port=' in your server.properties file.
* rconport - The rcon port for your minecraft server. Look for the line 'rcon.port=' in your server.properties file.
* rconpassword - The rcon password for your minecraft server. Look for the line 'rcon.password=' in your server.properties file.

If node isn't in your path, you can run geologist using something like the following:

```bash
/opt/node/bin/node `which geologist`
```

Examples
------------

First, run geologist on your minecraft server and pass in the appropriate parameters:

```bash
geologist --port 9000 --minecrafthost localhost --queryport [query port] --rconport [rcon port] --rconpassword [rcon password]
```

Next, we'll retrieve the server's stats:

```bash
curl localhost:9000/stats
{"splitnum":"splitnum","key_val_start":128,"hostname":"Welcome to Your Server","gametype":"SMP","game_id":"MINECRAFT","version":"1.1","plugins":"","map":"yourmap","numplayers":"1","maxplayers":"4","hostport":"yourport","hostip":"yourip","key_val_end":256,"player_":["drewolson"]}
```

Now, let's issue a command. You can pass any valid rcon command, but we'll make it rain:

```bash
curl -X POST --data "command=toggledownfall" localhost:9000/command
{"size":44,"reqID":1,"type":0,"data":"Toggling rain and snow, hold on..."}
```

In a nutshell, perform a GET on /stats for the server stats, perform a POST on /command and provide a command in the post body to send rcon commands to your server.

Thanks
------------

Thanks to the following projects, which I've essentially vendored and exposed via express:

* https://github.com/kmpm/node-mcquery
* https://github.com/tehbeard/node-rcon

License
------------

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
