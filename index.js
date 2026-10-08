// Obtenemos los argumentos ingresados en la terminal
const method = process.argv[2];
const resource = process.argv[3];

// Verificamos que se hayan ingresado los argumentos necesarios
if (!method || !resource) {
    console.log("Debes ingresar un comando. Ejemplo: GET products");
} else {

    // Separamos el recurso utilizando "/"
    const parts = resource.split("/");

    // Obtenemos el ID si existe
    const productId = parts[1];

    // GET products
    if (method === "GET" && parts[0] === "products") {

        // Si no hay ID, solicitamos todos los productos
        if (!productId) {

            const response = await fetch("https://fakestoreapi.com/products");

            if (!response.ok) {
                console.log(`Error al consultar la API. Código: ${response.status}`);
            } else {
                const products = await response.json();

                console.log(products);
            }

        // Si hay ID, solicitamos solamente ese producto
        } else {

            const response = await fetch(
                `https://fakestoreapi.com/products/${productId}`
            );

            if (!response.ok) {
                console.log(`Error al consultar la API. Código: ${response.status}`);
            } else {
                const product = await response.json();

                console.log(product);
            }
        }

    // POST products
    } else if (method === "POST" && parts[0] === "products") {

        const title = process.argv[4];
        const price = process.argv[5];
        const category = process.argv[6];

        // Verificamos que se hayan ingresado todos los datos
        if (!title || !price || !category) {
            console.log("Debes indicar title, price y category.");
        } else if (isNaN(Number(price))) {
            console.log("El precio debe ser un número.");
        } else {

            const newProduct = {
                title: title,
                price: Number(price),
                category: category
            };

            const response = await fetch("https://fakestoreapi.com/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProduct)
            });

            if (!response.ok) {
                console.log(`Error al crear el producto. Código: ${response.status}`);
            } else {
                const product = await response.json();
                console.log(product);
            }
        }
        
    // DELETE products/<id>
    } else if (method === "DELETE" && parts[0] === "products") {

    // Verificamos que se haya ingresado un ID
    if (!productId) {
        console.log("Debes indicar el ID del producto a eliminar.");
    } else {

        // Enviamos la petición DELETE a la API
        const response = await fetch(
            `https://fakestoreapi.com/products/${productId}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            console.log(`Error al eliminar el producto. Código: ${response.status}`);
        } else {
            const product = await response.json();

            console.log(product);
        }
    }
    
    } else {
        console.log("Comando no válido.");
    }
}

