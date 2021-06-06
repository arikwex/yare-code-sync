(() => {
  const RenderService = require('./RenderService');

  const PATROL_RADIUS = 100;
  const PATROL_CENTER = [
    (base.position[0] + enemy_base.position[0] * 0.2) / 1.2,
    (base.position[1] + enemy_base.position[1] * 0.2) / 1.2
  ];
  RenderService.circle(PATROL_CENTER, PATROL_RADIUS, 'rgba(255, 255, 50, 0.4)');

  // Generate a random target in a circle between the bases
  const generateDestination = () => {
    let dx = Infinity;
    let dy = Infinity;
    while (dx * dx + dy * dy > PATROL_RADIUS * PATROL_RADIUS) {
      dx = -PATROL_RADIUS + Math.random() * 2 * PATROL_RADIUS;
      dy = -PATROL_RADIUS + Math.random() * 2 * PATROL_RADIUS;
    }
    // Closer to my base than the enemy base...
    return [
      PATROL_CENTER[0] + dx,
      PATROL_CENTER[1] + dy
    ];
  };

  // Apply strategy to each spirit
  my_spirits.forEach((spirit) => {
    let mem = memory[spirit.id];

    // Create memory slot if needed
    if (mem === undefined) {
      mem = {};
      memory[spirit.id] = mem;
    }

    // Assign a new destination if non exists
    if (mem.destination === undefined) {
      mem.destination = generateDestination();
      RenderService.ping(mem.destination);
      RenderService.log(`${spirit.id} assigned destination = ${mem.destination}`);
    }

    // Move to desintation or delete when arrived
    const dx = spirit.position[0] - mem.destination[0];
    const dy = spirit.position[1] - mem.destination[1];
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 2) {
      delete mem.destination;
    } else {
      spirit.move(mem.destination);
      RenderService.text(spirit, `Dist: ${parseInt(dist)}`, '#777');
      RenderService.line(spirit, mem.destination, '#37f');
    }
  });
})();