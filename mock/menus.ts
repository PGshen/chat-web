import { Router } from 'express'
import { Role } from './data'

const router = Router()

router.get('/', (req, res) => {
  if (req.query.type === 'shortcut') {
    return res.send([
      req.can(Role.staff) && {
        id: '610159148224d543ae4e05b3',
        label: '0',
        icon: 'comments',
        name: 'comments'
      },
      req.can(Role.staff) && {
        id: '610159148224d543ae4e05b4',
        label: 'New',
        icon: 'add',
        name: 'new',
        params: { type: 'blog' },
        children: [
          { id: '610159148224d543ae4e05b5', label: 'Post', name: 'new', params: { type: 'blog' } },
          { id: '610159148224d543ae4e05b6', label: 'Media', name: 'upload' },
          req.can(Role.admin) && { id: '610159148224d543ae4e05b7', label: 'Page', name: 'new', params: { type: 'page' } },
          req.can(Role.admin) && { id: '610159148224d543ae4e05b8', label: 'User', name: 'users' }
        ].filter(Boolean)
      }
    ].filter(Boolean))
  }

  res.send([
  ].filter(Boolean))
})

export default router
