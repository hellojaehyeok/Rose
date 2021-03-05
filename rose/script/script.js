





function three(){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer({ alpha: true });
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

    camera.position.set(0, 19, 5);
    camera.lookAt(0, 0, 0);


    const ambient = new THREE.AmbientLight( 0xffffff, 0.5 );
    scene.add( ambient );

    const directionalLight = new THREE.DirectionalLight( 0xf282a7, 1 );
    scene.add( directionalLight );

    const spotLight = new THREE.SpotLight( 0xd4e6c4,1 );
    spotLight.position.set( 0, -10, 0 );
    scene.add( spotLight );


    var main = new THREE.Object3D;
    var main_loader = new THREE.OBJLoader();
    main_loader.load(
        "./obj/rose.obj",
        function(object){
            object.position.set(0, -9, 0);
            object.scale.set(0.2, 0.2, 0.2);
            main = object;
            scene.add(main);
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
                

 
    var t = 0;
    const renderScene = new function renderScene() {
        requestAnimationFrame(renderScene);
        t += 0.0025;  
        camera.position.x = 20*Math.cos(t) + 0;
        camera.position.z = 20*Math.sin(t) + 0;
        camera.lookAt(0, 0, 0);
        composer.render();
    }  
    
}
three();