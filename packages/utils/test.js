import test from 'ava'
import EventEmitter from 'events'
import {promiseEvent} from './src'
// import {promiseEvent} from './index'

test('promiseEvent - resolve', t => {
  const ee = new EventEmitter()
  const p = promiseEvent(ee, 'foo')
  t.is(ee.listenerCount('foo'), 1)
  ee.emit('foo', 'bar')
  return p.then(value => {
    t.is(value, 'bar')
    t.is(ee.listenerCount('foo'), 0)
  })
})

test('promiseEvent - timeout', t => {
  const ee = new EventEmitter()
  const p = promiseEvent(ee, 'foo', {timeout: 500})
  t.is(ee.listenerCount('foo'), 1)
  t.throws(p, 'timeout')
  p.catch(() => {
    t.is(ee.listenerCount('foo'), 0)
  })
})
