import redis
r = redis.Redis(host='redis', port=6379, db=0)
print(r.set('foo', 'bar'))
print(r.get('foo'))