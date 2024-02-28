const btns = document.getElementsByTagName('button');

const addProductToCart = async (pId) => {
    try {
        const result = await fetch(`http://localhost:8080/api/carts/65d5821cea5eeee5fcb965a0/product/${pId}`, {
            body: JSON.stringify({
                quantity: 1
            }),
            method: 'post',
            headers: {
                'Content-Type': 'application/json' 
            }
        });
        if(result.status === 200 || result.status === 201){
            alert('Se agregó correctamente');
        }
        else{
            alert('Error, no se pudo agregar');
        }
    } catch (error) {
        alert('Error, no se pudo agregar');
    }
}

for(let btn of btns){
    btn.addEventListener('click', (event) => {
        addProductToCart(btn.id);
    });
}