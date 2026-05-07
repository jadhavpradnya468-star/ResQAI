const express = require('express');
const router = express.Router();

const firstAid = {
  'dog bleeding':     'Apply firm pressure with a clean cloth. Keep the dog calm. Rush to vet immediately.',
  'cat bleeding':     'Gently wrap with bandage. Do not remove embedded objects. Visit vet urgently.',
  'dog fracture':     'Immobilize the limb with a splint. Do not let the animal walk. Go to vet now.',
  'cat fracture':     'Keep cat still, wrap in soft cloth. Do not let it jump. Rush to vet.',
  'bird injured':     'Place in a dark, quiet box. Do not feed or give water. Contact wildlife rescue.',
  'cow injured':      'Keep animal calm, call a large-animal vet. Do not move unnecessarily.',
  'vet not available': 'Keep animal warm and calm. Call animal helpline: 1962. Search nearest emergency vet online.',
  'no vet':           'Keep animal warm and calm. Call animal helpline: 1962. Search nearest emergency vet online.',
  'bleeding':         'Apply firm pressure with clean cloth. Elevate the area if possible. Rush to vet.',
  'fracture':         'Do not move the animal. Immobilize gently. Rush to vet immediately.',
  'not breathing':    'Check airway is clear. Give gentle rescue breaths. Rush to vet emergency immediately.',
  'poisoning':        'Do not induce vomiting. Note what was eaten. Rush to vet immediately.',
  'burned':           'Cool with room temperature water. Do not use ice. Cover loosely. Rush to vet.',
  'unconscious':      'Check breathing. Keep warm. Do not give water. Rush to vet immediately.',
  'default':          'Keep the animal calm and warm. Minimize movement. Rush to nearest vet immediately.'
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