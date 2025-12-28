import { Router } from 'express'
import {getTables, occupyTable, unoccupyTable} from '../controllers/tableController'

const router = Router()

router.get('/', getTables)
router.post('/:id/occupy', occupyTable)
router.post('/:id/unoccupy', unoccupyTable)

export default router
