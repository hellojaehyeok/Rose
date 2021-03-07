





function three(){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer({ alpha: true ,  antialias: true });
    document.getElementById("rose").appendChild(renderer.domElement);
    control = new THREE.OrbitControls(camera, renderer.domElement);

    //SIZE ---------
    renderer.setSize(window.innerWidth, window.innerHeight);
    window.addEventListener("resize", function(){
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize(width, height);
    })
    renderer.setClearColor( 0x000000, 1 );

    camera.position.set(16, 19, 4);
    camera.lookAt(0, 0, 0);


    const ambient = new THREE.AmbientLight( 0xffffff, 0.5 );
    scene.add( ambient );

    const directionalLight = new THREE.DirectionalLight( 0xf282a7, 1 );
    scene.add( directionalLight );

    const spotLight = new THREE.SpotLight( 0xd4e6c4,1 );
    spotLight.position.set( 0, -10, 0 );
    scene.add( spotLight );


    var rose = new THREE.Object3D;
    var rose_loader = new THREE.OBJLoader();
    rose_loader.load(
        "./obj/rose.obj",
        function(object){
            object.position.set(0, -10, 0);
            object.scale.set(0.2, 0.2, 0.2);
            rose = object;
            scene.add(rose);
        }
    );

    let composer;
    composer = new POSTPROCESSING.EffectComposer(renderer);
    composer.addPass(new POSTPROCESSING.RenderPass(scene,camera));

    const effectPass = new POSTPROCESSING.EffectPass(
      camera,
      new POSTPROCESSING.BloomEffect()
    );
    effectPass.renderToScreen = true;
    composer.addPass(effectPass);
                

 
    const renderScene = new function renderScene() {
        requestAnimationFrame(renderScene);
        rose.rotation.y += 0.008;
        composer.render();
    }  
    
}
three();