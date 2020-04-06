import sys
print (sys.path)

import traceback
import json

from flask import Flask
from flask import request
from flask import Response

import redis
r = redis.Redis(host='redis', port=6379, db=0)

app = Flask(__name__)

DEBUG_ENABLE = False

#@app.route('/api/', methods=['GET', 'POST', 'OPTIONS'], defaults={'path':''})
#@app.route('/api/<path:path>', methods=['GET', 'POST', 'OPTIONS'])


@app.route("/AssignChatServer")
def assignChatServer():

    result = None

    #Check redis server status
    if isRedisServerNormal() is False:
        # occur exception 
        pass

    #Find Chat Server in Redis
    data = r.get('activeChatServerList')
    # Data parsing
    serverList = ['a','b']

    result = serverList[0]

    #Return Chat Server Ip
    return "hello world!"


def isRedisServerNormal():
    return True


if __name__ == "__main__":
    port = 80
    try:
        port = int(sys.argv[1])
    except Exception as e:
        print('excute default port:80')
        port = 80

    app.run(host='0.0.0.0', port=port, debug=DEBUG_ENABLE)
    #app.run(host='0.0.0.0', port=8080, ssl_context='adhoc')
