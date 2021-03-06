import test from 'tape'
import ElementQuery from '../index.jsx'
import React from 'react'
import testTree from 'react-test-tree'
import sinon from 'sinon'

const WIDTH_LARGE = 300
const WIDTH_SMALL = 100
const SIZE_LARGE = 'large'
const SIZE_SMALL = 'small'

// TODO: move move me to a module like `react-tape`, and maybe have it be a
// browserify transform?
// proptype failures will go to console.warn, fail the tests when one is seen
test('test setup', (t) => {
  console._error = console.error
  console.error = (...args) => {
    t.fail(args.join(' '))
  }
  t.pass('ok')
  t.end()
})


test('browser render', (t) => {
  const large = {name: SIZE_LARGE, width: WIDTH_LARGE}
  const small = {name: SIZE_SMALL, width: WIDTH_SMALL}
  const sizes = [large, small]

  // resize the window to be large so we're sure that's not affecting the elements
  window.resizeTo(WIDTH_LARGE * 2, 1)

  const smallTree = testTree((<div style={{width: WIDTH_LARGE - WIDTH_SMALL}} testRefCollection="container">
    <ElementQuery sizes={sizes}>
      <h1>hi</h1>
    </ElementQuery>
  </div>), {mount: true, wrap: true})
  const smallEl = smallTree.get('container')[0].element

  t.equal(
    smallEl.state.sizes[0].width
    , small.width
    , 'sorts the sizes by small width first'
  )

  t.equal(
    smallEl.state.size
    , small.name
    , 'matches the min width for the smallest size, not going to a larger size'
  )

  const largeTree = testTree(<div style={{width: WIDTH_LARGE + WIDTH_SMALL}} testRefCollection="container"><ElementQuery sizes={sizes}><h1>hi</h1></ElementQuery></div>, {mount: true, wrap: true})
  const largeEl = largeTree.get('container')[0].element

  t.equal(
    largeEl.state.size
    , large.name
    , 'matches the min width, for the largest size'
  )

  t.end()
})

test('fails on invalid sizes', (t) => {
  const errorStub = sinon.stub()
  const _error = console.error
  console.error = errorStub

  const nonNumberSizes = [{name: 'hi', width: 'not a number'}]
  testTree(<ElementQuery sizes={nonNumberSizes}><span>hi</span></ElementQuery>, {mount: true})

  t.ok(
    errorStub.calledOnce
    , 'errors when a non-number width is passed'
  )
  errorStub.reset()

  const zeroWidth = [{name: 'hi', width: 0}]
  testTree(<ElementQuery sizes={zeroWidth}><span>hi</span></ElementQuery>, {mount: true})

  t.ok(
    errorStub.calledOnce
    , 'errors when a `0` width is passed'
  )
  errorStub.reset()

  console.error = _error
  t.end()
})
