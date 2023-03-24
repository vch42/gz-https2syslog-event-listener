# gz-https2syslog-event-listener
<br />
<br />
> :warning: **UPDATE:** This repo is NOT actively maintained. Bitdefender updated the KB article mentioned below and now provides a updated script similar to this package which will install and configure a listener. You may want to check that one out instead: https://www.bitdefender.com/business/support/en/77209-144080-build-an-event-push-service-api-connector-for-cef-standard.html
<br />
<br />
Simple nodejs client service that listens for authenticated HTTPS POST requests from GravityZone Cloud and forwards each row in the configured local or remote syslog.<br />
Can be used to receive and forward GravityZone Cloud Push Events to SIEMs which do not have a native HTTPS listener, but are capable of ingesting events via syslog.<br />
<br />
This package is based of this Bitdefender GravityZone KB article (but does not implement it verbatim): <br />
https://www.bitdefender.com/support/sending-events-from-gravityzone-cloud-to-siems-lacking-https-listeners-2373.html <br />
<br />
Bitdefender GravityZone Cloud Push Events documentation: <br />
https://www.bitdefender.com/business/support/en/77209-135318-push.html<br />
<br />
<br />

> :warning: **DISCLAIMER:** While this DEB package is built based of the above mentioned Bitdefender public KB, THE DERIVATIVE WORK CONTAINED IN THIS CODE REPOSITORY IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE PRESENTED HEREBY.


### Improvments (compared to the Bitdefender KB):
* dependencies handling at install time (both deb and nodejs via npm)
* installs as a service
* service runs under dedicated low privilege user/group
* generates a default config and self-signed cert, if found missing
* upgrade mechanism (will not overwrite an existing valid configuration)
* automatic installation, no need to manually edit source code files


<br />

### Contents:
```
.
├── DEBIAN
│   ├── control
│   ├── md5sums
│   ├── postinst
│   ├── postrm
│   ├── preinst
│   └── prerm
├── lib
│   └── systemd
│       └── system
│           └── gz-https2syslog-event-listener.service
└── opt
    └── gz-https2syslog-event-listener
        ├── api
        │   ├── config
        │   │   └── config.json.template
        │   └── epsSyslogHelper.js
        ├── certs
        ├── package.json
        └── server.js

9 directories, 11 files
```
<br />
<br />

### How to build
```
$ git clone https://github.com/vch42/gz-https2syslog-event-listener.git
$ cd ./gz-https2syslog-event-listener
$ chmod +x ./src/DEBIAN/post* ./src/DEBIAN/pre*
$ rm -f ./src/opt/gz-https2syslog-event-listener/certs/blank
$ version="$(grep "Version" ./src/DEBIAN/control | cut -d' ' -f2)"
$ dpkg-deb --build ./src ../gz-https2syslog-event-listener_"$version".deb
$ cd ..
$ rm -rf ./gz-https2syslog-event-listener
```

### Hot to install
```
$ sudo dpkg --install ./gz-https2syslog-event-listener_"$version".deb
```











