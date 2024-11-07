/*
    Objetivo: Sistema de cadastro, edição, exclusão e listgem de livros
    Data: 30/10/2024
    Autor: Raphael Guerra
    Versão: 1.0
*/
//Recebe o botão salvar no HTML
const botaoSalvar = document.getElementById('salvar')
//Recebe dados do formulário
const getDadosForm = function(){
    let livroJson = {}
    let status = true

    //Recebe das Caixas do HTML os dados a serem enviados para a API
    let title = document.getElementById('title')
    let subtitle = document.getElementById('subtitle')
    let image = document.getElementById('image')
    let price = document.getElementById('price')

    if(title =='' || subtitle =='' || image  =='' || price ==''){
        alert('Todos os dados devem ser preenchidos')
        status = false
    }else{
        livroJson.title = title.value
        livroJson.subtitle = subtitle.value
        livroJson.image = image.value
        livroJson.price = price.value
    }
    
    if(status){
        return livroJson
    }else{
        return false
    }
}
//Salva um Livro novo 
const postLivro = async function(dadosLivro){
    let url = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/livro'
    let response = await fetch(url, {method: 'POST', mode: 'cors', headers:{'Content-Type':'application/json'}, body: JSON.stringify(dadosLivro)})

    if (response.status == 201){
        alert('Registrado')
    }else{
        alert('Não')
    }

    let dados = response.json()
    setCreateCard(dadosLivro)
    console.log(dadosLivro)
}
//Altera um livro
const putLivro = function(){}
//Deleta um livro
const delLivro = function(id){
    alert(id)
}
//Lista os livros
const getLivros = async function(){
    let url = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/livros'

    let response =await fetch(url)
    let dados = await response.json()

    setCardItens(dados)
}

//Cria a lista de intens no HTML
const setCardItens = function(dadosLivros){
    //Recebe a cx principal onde será criado a lista de livros
    let divListDados = document.getElementById('listDados')

    dadosLivros.books.forEach(function(livro){
        let divDados = document.createElement('div')
        let divTitle = document.createElement('div')
        let divSubTitle = document.createElement('div')
        let divPrice = document.createElement('div')
        let divOpcoes = document.createElement('div')
        let spanEditar = document.createElement('span')
        let spanExcluir = document.createElement('span')
        let imgEditar = document.createElement('img')
        let imgExcluir = document.createElement('img')


        divTitle.innerText = livro.title
        divSubTitle.innerText = livro.subtitle
        divPrice.innerText = livro.price

        divDados.setAttribute('id','dados')
        divDados.setAttribute('class', 'linha dados')
        imgEditar.setAttribute('src', 'img/editar.png')
        imgExcluir.setAttribute('src', 'img/excluir.png')
        imgEditar.setAttribute('idLivro', livro.id)
        imgExcluir.setAttribute('idLivro', livro.id)

        divListDados.appendChild(divDados)
        divDados.appendChild(divTitle)
        divDados.appendChild(divSubTitle)
        divDados.appendChild(divPrice)
        divDados.appendChild(divOpcoes)
        divOpcoes.appendChild(spanEditar)
        divOpcoes.appendChild(spanExcluir)
        spanEditar.appendChild(imgEditar)
        spanExcluir.appendChild(imgExcluir)

        imgExcluir.addEventListener('click', function(){
            let id = imgExcluir.getAttribute('idLivro', delLivro)
            delLivro(id)
        })
    });
}
//Busca de Livro por ID
const getIdLivro = function(){}

botaoSalvar.addEventListener('click', function(){
    //postLivro()
    let dados = getDadosForm()

    if(dados){
        postLivro(dados)
    }
})

window.addEventListener('load', function(){
    getLivros()
})