async function login (e) { 
    preventDefault(e);
    let matr = document.getElementById('matricula').value
    let senha = document.getElementById('password').value
    if (matr == '0'){
        window.alert('aaaaaa')
        //window.location.href= './user.html';
        matr = '';
    } else if (matr == '1'){
        //window.location.href= './telaAdmin.html';
        matr = '';
    } else {
        matr = '';
    }
}