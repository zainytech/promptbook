import UpdadtePrompt from './update-prompt'
import { Suspense } from 'react';

const EditPrompt = () => {
  return (

<Suspense fallback={<div>Loading...</div>}>
  <UpdadtePrompt />
</Suspense>
  )
}

export default EditPrompt