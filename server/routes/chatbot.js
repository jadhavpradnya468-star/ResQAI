const express = require('express');
const router = express.Router();

const firstAid = {
  'dog bleeding':    'Apply firm pressure with a clean cloth. Keep the dog calm. Rush to vet immediately.',
  'cat bleeding':    'Gently wrap with bandage. Do not remove embedded objects. Visit vet urgently.',
  'dog fracture':    'Immobilize the limb with a splint. Do not let the animal walk. Go to vet now.',
  'bird injured':    'Place in a dark, quiet box. Do not feed or give water. Contact wildlife rescue.',
  'cow injured':     'Keep animal calm, call a large-animal vet. Do not move unnecessarily.',
  'default':         'Keep the animal calm and warm. Minimize movement. Rush to nearest vet immediately.'
};

router.post('/', (req, res) => {
  const msg = req.body.message?.toLowerCase() || '';
  let reply = firstAid['default'];

  for (const key of Object.keys(firstAid)) {
    if (msg.includes(key)) {
      reply = firstAid[key];
      break;
    }
  }
  res.json({ reply });
});

module.exports = router;