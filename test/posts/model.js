const fs = require('fs')
const { Post } = require('../../models')

describe('Post', function () {
  describe('#get()', function () {
    it('should return all posts', function () {
      const actual = Post.get()
      const expected = []

      expect(actual).to.deep.equal(expected)
    })
  })

  describe('#create(body)', function () {
    it('should return all posts', function () {
      const actual = Post.create({ title: 'xxx', content: 'yyy' })

      expect(actual.id).to.be.ok
      expect(actual.title).to.deep.equal('xxx')
      expect(actual.content).to.deep.equal('yyy')
    })
  })

  describe('#find(id)', function () {
    it('should find the specified post', function () {
      const post = { id: 1, title: 'xxx', content: 'yyy' }
      fs.writeFileSync(global.db, JSON.stringify([ post ]))
      const actual = Post.find(1)

      expect(actual).to.deep.equal(post)
    })
  })

  describe('#destroy', function () {
    it('should remove the specified post', function () {
      const post = { id: 1, title: 'xxx', content: 'yyy' }
      fs.writeFileSync(global.db, JSON.stringify([ post ]))
      const result = Post.destroy(1)
      const actual = JSON.parse(fs.readFileSync(global.db))

      expect(result).to.deep.equal(post)
      expect(actual.length).to.equal(0)
    })
  })

  describe('#patch', function () {
    it('should patch an existing record', function () {
      const post = { id: 1, title: 'xxx', content: 'yyy' }
      fs.writeFileSync(global.db, JSON.stringify([ post ]))
      const patch = { title: 'zzz' }
      const result = Post.patch(1, patch)
      const actual = JSON.parse(fs.readFileSync(global.db))
      const expected = Object.assign(post, patch)

      expect(result).to.deep.equal(expected)
      expect(actual.length).to.equal(1)
    })
  })
})
