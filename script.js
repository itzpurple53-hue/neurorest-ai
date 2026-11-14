function startNeuroRest() {

  // 1. Create 3D scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x10243b);

  // 2. Camera
  const camera = new THREE.PerspectiveCamera(
    45,
    1,
    0.1,
    100
  );

  camera.position.set(9, 7, 10);
  camera.lookAt(0, 1, 0);

  // 3. Renderer
  const container = document.getElementById("roomCanvas");

  const renderer = new THREE.WebGLRenderer({
    antialias: true
  });

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  );

  renderer.setSize(
    container.clientWidth,
    container.clientHeight
  );

  container.appendChild(renderer.domElement);

 // 4. Lighting
const ambient = new THREE.AmbientLight(0xffffff,0.65);
scene.add(ambient);

const light = new THREE.DirectionalLight(0xc5dcff,0.8);
light.position.set(5,9,5);
scene.add(light);

// Soft blue bedroom lighting
const blueLight = new THREE.PointLight(0x268cff,1.5,12);
blueLight.position.set(0,3,0);
scene.add(blueLight);

// Connect lights to lighting controls
window.neuroAmbientLight = ambient;
window.neuroDirectionalLight = light;
window.neuroBlueLight = blueLight;
  // 5. Materials
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x263b52
  });

  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x526a82
  });

  const bedMat = new THREE.MeshStandardMaterial({
    color: 0x263e5b
  });

  const mattressMat = new THREE.MeshStandardMaterial({
    color: 0xdce8f2
  });

  // 6. Floor
  function addBox(w, h, d, x, y, z, material) {
    const geometry = new THREE.BoxGeometry(w, h, d);
    const object = new THREE.Mesh(geometry, material);

    object.position.set(x, y, z);
    scene.add(object);

    return object;
  }

  addBox(12, 0.2, 10, 0, -0.1, 0, floorMat);

  // 7. Walls
  addBox(12, 5, 0.2, 0, 2.5, -5, wallMat);
  addBox(0.2, 5, 10, -6, 2.5, 0, wallMat);

  // 8. Bed frame
  addBox(4, 0.5, 6, 0, 0.35, 0, bedMat);

  // 9. Mattress
  addBox(3.8, 0.35, 5.8, 0, 0.75, 0, mattressMat);

  // 10. Headboard
  addBox(4, 1.5, 0.25, 0, 1.1, -2.9, bedMat);

  // 11. Pillow
  const pillowMat = new THREE.MeshStandardMaterial({
    color: 0xffffff
  });

  addBox(1.5, 0.25, 1, 0, 1.05, -1.9, pillowMat);

  // 12. Bedside table
  const tableMat = new THREE.MeshStandardMaterial({
    color: 0x795b48
  });

  addBox(1.2, 1.2, 1.2, 3, 0.6, -2, tableMat);

  // 13. Table lamp
  const lampMat = new THREE.MeshStandardMaterial({
    color: 0x53c8ff,
    emissive: 0x123b65
  });

  addBox(0.35, 0.8, 0.35, 3, 1.6, -2, lampMat);

// 14. AROMATHERAPY DIFFUSER

const diffuserMat = new THREE.MeshStandardMaterial({
  color: 0x9bdcff,
  metalness: 0.3,
  roughness: 0.3
});

// Diffuser body
const diffuserBody = new THREE.Mesh(
  new THREE.CylinderGeometry(0.16, 0.20, 0.42, 32),
  diffuserMat
);

diffuserBody.position.set(3.35, 1.41, -2);
scene.add(diffuserBody);

// Diffuser top
const diffuserTop = new THREE.Mesh(
  new THREE.CylinderGeometry(0.12, 0.12, 0.08, 32),
  new THREE.MeshStandardMaterial({
    color: 0x263e5b
  })
);

diffuserTop.position.set(3.35, 1.66, -2);
scene.add(diffuserTop);

// Soft blue diffuser light
const diffuserLight = new THREE.PointLight(
  0x53c8ff, 0.7, 3
);

diffuserLight.position.set(3.35, 1.8, -2);
scene.add(diffuserLight);

// DIFFUSER MIST

const mistParticles = [];

const mistMat = new THREE.MeshBasicMaterial({
  color: 0xeaf7ff,
  transparent: true,
  opacity: 0.35
});

for (let i = 0; i < 5; i++) {

  const mist = new THREE.Mesh(
    new THREE.SphereGeometry(0.055, 12, 12),
    mistMat.clone()
  );

  mist.position.set(
    3.35 + (Math.random() - 0.5) * 0.12,
    1.85 + i * 0.12,
    -2
  );

  scene.add(mist);
  mistParticles.push(mist);
}

// INDOOR PLANT

const potMat = new THREE.MeshStandardMaterial({
  color: 0xc58b68
});

const leafMat = new THREE.MeshStandardMaterial({
  color: 0x398b69
});

// Plant pot
const plantPot = new THREE.Mesh(
  new THREE.CylinderGeometry(0.22, 0.16, 0.4, 24),
  potMat
);

plantPot.scale.set(1.4, 1.4, 1.4);
plantPot.position.set(-4.5, 0.3, -2.5);
scene.add(plantPot);

// Plant leaves
for (let i = 0; i < 6; i++) {

  const leaf = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 16, 16),
    leafMat
  );

  const angle = (i / 6) * Math.PI * 2;

  leaf.position.set(
    -4.5 + Math.cos(angle) * 0.2,
    0.65 + (i % 2) * 0.12,
    -2.5 + Math.sin(angle) * 0.2
  );

  leaf.scale.set(1.1, 2.5, 1.1);
  scene.add(leaf);
}

// BEDROOM WINDOW

const windowFrameMat = new THREE.MeshStandardMaterial({
  color: 0x263e5b
});

const windowGlassMat = new THREE.MeshStandardMaterial({
  color: 0x183c65,
  emissive: 0x102b50,
  emissiveIntensity: 0.5
});

// Window frame
addBox(3, 2, 0.15, -2.5, 3.1, -4.82, windowFrameMat);

// Window glass
addBox(2.7, 1.7, 0.05, -2.5, 3.1, -4.72, windowGlassMat);

// Window divider
addBox(0.08, 1.8, 0.08, -2.5, 3.1, -4.65, windowFrameMat);

addBox(2.8, 0.08, 0.08, -2.5, 3.1, -4.65, windowFrameMat);

// MODERN BOOKSHELF

const shelfMat = new THREE.MeshStandardMaterial({
  color: 0x594536,
  roughness: 0.8
});

const bookColors = [
  0x8db8d8,
  0xe6edf5,
  0x536f91,
  0xb6a99a
];

// Shelf sides
addBox(0.8, 2.8, 0.15, -5.45, 1.4, 0.5, shelfMat);
addBox(0.8, 2.8, 0.15, -5.45, 1.4, 2.1, shelfMat);

// Shelves
addBox(0.85, 0.15, 1.75, -5.45, 0.1, 1.3, shelfMat);
addBox(0.85, 0.15, 1.75, -5.45, 1.0, 1.3, shelfMat);
addBox(0.85, 0.15, 1.75, -5.45, 1.9, 1.3, shelfMat);
addBox(0.85, 0.15, 1.75, -5.45, 2.8, 1.3, shelfMat);

// Decorative books
for (let i = 0; i < 4; i++) {

  const book = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 0.55, 0.35),
    new THREE.MeshStandardMaterial({
      color: bookColors[i]
    })
  );

  book.position.set(
    -5.45,
    0.48,
    0.55 + i * 0.38
  );

  scene.add(book);
}
// TRIPOD FLOOR LAMP

const lampWood = new THREE.MeshStandardMaterial({
  color: 0x8b6848,
  roughness: 0.8
});

const lampShade = new THREE.MeshStandardMaterial({
  color: 0xf3dfbd,
  roughness: 0.9,
  emissive: 0xffc77d,
  emissiveIntensity: 0.35
});

// Lamp position
const lampX = -4.8;
const lampZ = 3.05;

// Create tripod legs
function createLampLeg(start, end) {

  const startPoint = new THREE.Vector3(...start);
  const endPoint = new THREE.Vector3(...end);

  const direction = new THREE.Vector3()
    .subVectors(endPoint, startPoint);

  const leg = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.045, 0.06, direction.length(), 12
    ),
    lampWood
  );

  leg.position.copy(startPoint)
    .add(endPoint).multiplyScalar(0.5);

  leg.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.normalize()
  );

  scene.add(leg);
}

// Three wooden legs
createLampLeg(
  [-5.25, 0.05, 2.65],
  [lampX, 1.85, lampZ]
);

createLampLeg(
  [-4.35, 0.05, 2.65],
  [lampX, 1.85, lampZ]
);

createLampLeg(
  [-4.8, 0.05, 3.7],
  [lampX, 1.85, lampZ]
);

// Fabric lampshade
const shade = new THREE.Mesh(
  new THREE.CylinderGeometry(0.38, 0.48, 0.55, 32),
  lampShade
);

shade.position.set(lampX, 2.05, lampZ);
scene.add(shade);

// Warm white light
const floorLampLight = new THREE.PointLight(
  0xffd39b, 1.2, 5
);

floorLampLight.position.set(lampX, 1.9, lampZ);
scene.add(floorLampLight);
// BEDROOM CURTAINS

const curtainMat = new THREE.MeshStandardMaterial({
  color: 0x172e50,
  roughness: 0.9
});

// Left curtain
addBox(
  0.55, 2.1, 0.18,
  -4.15, 3.1, -4.55,
  curtainMat
);

// Right curtain
addBox(
  0.55, 2.1, 0.18,
  -0.85, 3.1, -4.55,
  curtainMat
);

// Curtain top rail
const railMat = new THREE.MeshStandardMaterial({
  color: 0xb7cce0,
  metalness: 0.6
});

addBox(
  3.8, 0.08, 0.12,
  -2.5, 4.2, -4.55,
  railMat
);

// BEDROOM RUG

const rugMat = new THREE.MeshStandardMaterial({
  color: 0x8daac5,
  roughness: 1
});

addBox(
  2.8, 0.06, 2,
  3.8, 0.04, 1.8,
  rugMat
);

  
  // 13. CHARACTER MATERIALS

  const skinMat = new THREE.MeshStandardMaterial({
    color: 0xe8b995
  });

  const clothesMat = new THREE.MeshStandardMaterial({
    color: 0x4b91c7
  });

  const hairMat = new THREE.MeshStandardMaterial({
    color: 0x252333
  });

  // Helper for character body parts
  function addBodyPart(w, h, d, x, y, z, material) {
    const geometry = new THREE.BoxGeometry(w, h, d);
    const part = new THREE.Mesh(geometry, material);
    part.position.set(x, y, z);
    scene.add(part);
    return part;
  }

  // Body
  addBodyPart(
    1.25, 0.38, 2.1,
    0, 1.13, 0.1, clothesMat
  );

  // Head
  const headGeometry = new THREE.SphereGeometry(
    0.43, 32, 32
  );

  const head = new THREE.Mesh(
    headGeometry, skinMat
  );

  head.position.set(0, 1.4, -1.35);
  scene.add(head);



  // Arms
  addBodyPart(
    0.32, 0.25, 1.5,
    -0.78, 1.1, 0.1, skinMat
  );

  addBodyPart(
    0.32, 0.25, 1.5,
    0.78, 1.1, 0.1, skinMat
  );

  // Legs
  addBodyPart(
    0.5, 0.3, 1.7,
    -0.32, 1.1, 1.95, clothesMat
  );

  addBodyPart(
    0.5, 0.3, 1.7,
    0.32, 1.1, 1.95, clothesMat
  );

  // Feet
  addBodyPart(
    0.45, 0.25, 0.4,
    -0.32, 1.1, 2.9, skinMat
  );

  addBodyPart(
    0.45, 0.25, 0.4,
    0.32, 1.1, 2.9, skinMat
  );
// 14. Render
  
function animate() {
  requestAnimationFrame(animate);

  // Animate diffuser mist
  mistParticles.forEach((mist, index) => {

    mist.position.y += 0.003;

    mist.material.opacity =
      0.35 - (mist.position.y - 1.85) * 0.12;

    if (mist.position.y > 2.5) {
      mist.position.y = 1.85;
    }

  });

  renderer.render(scene, camera);
}


  animate();

  // 15. Responsive screen
  window.addEventListener("resize", function() {
    const w = container.clientWidth;
    const h = container.clientHeight;

    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    renderer.setSize(w, h);
  });
}

// Load Three.js
function loadRoom() {
  const script = document.createElement("script");

  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";

  script.onload = function() {
    startNeuroRest();
    console.log("NeuroRest 3D Room Ready!");
  };

  script.onerror = function() {
    console.error("Three.js could not load.");
  };

  document.head.appendChild(script);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadRoom);
} else {
  loadRoom();
}


document.addEventListener("DOMContentLoaded", function() {

  const button = document.getElementById("analyseBtn");
  const message = document.getElementById("aiMessage");

  if (!button || !message) return;

  button.addEventListener("click", function() {

    const light = Number(
      document.getElementById("lightSlider").value
    );

    const sound = Number(
      document.getElementById("soundSlider").value
    );

    const temp = Number(
      document.getElementById("tempSlider").value
    );

    const aroma = document.getElementById("aromaBtn")
      .textContent.includes("ON");

    let feedback = [];

    // Lighting analysis
    if (light > 70) {
      feedback.push("Lighting is quite bright. Consider reducing the brightness.");
    } else if (light < 20) {
      feedback.push("Lighting is very low. Consider a comfortable level of brightness.");
    } else {
      feedback.push("Lighting level is within the selected demonstration range.");
    }

    // Sound analysis
    if (sound > 70) {
      feedback.push("Sound level is high. Consider lowering the sound.");
    } else {
      feedback.push("Sound setting is within the selected demonstration range.");
    }

    // Temperature analysis
    if (temp > 27) {
      feedback.push("Temperature setting is relatively high.");
    } else if (temp < 20) {
      feedback.push("Temperature setting is relatively low.");
    } else {
      feedback.push("Temperature setting is within the selected range.");
    }

    // Aromatherapy analysis
    feedback.push(
      aroma
        ? "Aromatherapy diffuser is switched ON."
        : "Aromatherapy diffuser is switched OFF."
    );

    
message.innerHTML =
  "<b>NEUROREST AI ANALYSIS COMPLETE</b><br><br>" +
  feedback.join(" ") +
  "<br><br><b>AI RECOMMENDATION:</b><br>" +
  (light > 60
    ? "Reduce room brightness for a calmer environment."
    : "Current lighting level is suitable for this simulation.") +
  "<br>" +
  (sound > 50
    ? "Reduce sound level to create a quieter environment."
    : "Sound level is suitable for this simulation.") +
  "<br>" +
  (temp > 27
    ? "Consider lowering the room temperature."
    : "Temperature setting is suitable for this simulation.");


  });

});

  

document.addEventListener("DOMContentLoaded", function() {

  
// LIGHTING CONTROL
const lightSlider = document.getElementById("lightSlider");
const lightValue = document.getElementById("lightValue");
const lightDisplay = document.getElementById("lightLevel");
  // RELAXATION INDEX SIMULATION
function updateRelaxation() {

  const light = Number(lightSlider.value);
  const sound = Number(soundSlider.value);
  const temp = Number(tempSlider.value);

  const aroma = aromaBtn.textContent.includes("ON");

  let score = 100;

  score -= Math.abs(light - 30) * 0.5;
  score -= Math.abs(sound - 25) * 0.4;
  score -= Math.abs(temp - 24) * 3;

  if (aroma) {
    score += 5;
  }

  score = Math.max(0, Math.min(100, Math.round(score)));

  document.getElementById("relaxLevel").innerHTML =
    score + "<small>%</small>";
}

lightSlider.addEventListener("input", function() {

  const brightness = Number(this.value);

  // Update percentage
  lightValue.textContent = brightness + "%";
  lightDisplay.innerHTML = brightness + "<small>%</small>";

  // Update 3D room lighting
  if (window.neuroBlueLight) {
    window.neuroBlueLight.intensity = brightness / 50;
  }

  if (window.neuroAmbientLight) {
    window.neuroAmbientLight.intensity =
      0.15 + (brightness / 100) * 0.8;
  }

  if (window.neuroDirectionalLight) {
    window.neuroDirectionalLight.intensity =
      0.2 + (brightness / 100) * 0.8;
  }
  updateRelaxation();
});

  // SOUND CONTROL
  const soundSlider = document.getElementById("soundSlider");
  const soundValue = document.getElementById("soundValue");
  const soundDisplay = document.getElementById("soundLevel");

  soundSlider.addEventListener("input", function() {
    soundValue.textContent = this.value + "%";
    soundDisplay.innerHTML = this.value + "<small>%</small>";
    updateRelaxation();
  });

  // TEMPERATURE CONTROL
  const tempSlider = document.getElementById("tempSlider");
  const tempValue = document.getElementById("tempValue");

  tempSlider.addEventListener("input", function() {
    tempValue.textContent = this.value + "°C";
    updateRelaxation();
  });

  // AROMATHERAPY CONTROL
  const aromaBtn = document.getElementById("aromaBtn");
  let aromaOn = false;

  aromaBtn.addEventListener("click", function() {
    aromaOn = !aromaOn;

    aromaBtn.textContent = aromaOn
      ? "DIFFUSER ON"
      : "DIFFUSER OFF";

    aromaBtn.style.background = aromaOn
      ? "#168b70"
      : "#168bd0";
    updateRelaxation();
  });
updateRelaxation();
});

document.addEventListener("DOMContentLoaded", function() {

  const startButton = document.getElementById("startBtn");

  if (!startButton) return;

  startButton.addEventListener("click", function() {

    const bedroom = document.querySelector(".bedroom-section");

    if (bedroom) {
      bedroom.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    alert(
      "Welcome to NeuroRest AI!\n\nSmart Bedroom Simulation is ready."
    );

  });

});
// SMART MODE AUTOMATION
document.addEventListener("DOMContentLoaded", function() {

  const smartButton = document.getElementById("smartModeBtn");

  if (!smartButton) return;

  smartButton.addEventListener("click", function() {

    // Set recommended room environment
    document.getElementById("lightSlider").value = 30;
    document.getElementById("soundSlider").value = 20;
    document.getElementById("tempSlider").value = 24;

    // Update lighting display
    document.getElementById("lightSlider").dispatchEvent(new Event("input"));

    // Update sound display
    document.getElementById("soundSlider").dispatchEvent(new Event("input"));

    // Update temperature display
    document.getElementById("tempSlider").dispatchEvent(new Event("input"));

    smartButton.textContent = "SMART MODE ACTIVATED";

    

    alert("NEUROREST AI SMART MODE ACTIVATED!\n\nYour bedroom settings have been optimised in this simulation.");

  });

});

