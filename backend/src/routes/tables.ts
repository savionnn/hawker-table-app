import { Router } from 'express'
import {getTables, occupyTable, unoccupyTable} from '../controllers/tableController'

const router = Router()

router.get('/', getTables)
router.post('/occupy/:id', occupyTable)
router.post('/unoccupy/:id', unoccupyTable)

export default router
