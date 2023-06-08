import mock from './mock'

import './auth/jwt'
import './email/email'
import './edit/edit'
import './add/add'
import './user-list/user-list'

mock.onAny().passThrough()
