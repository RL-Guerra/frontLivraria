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

    if(title =='' || subtitle =='' || image  =='' ||price ==''){
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
const postLivro = function(dadosLivro){
    let url = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/livro'
    let response = fetch(url, {method: 'POST', mode: 'cors', headers:{'Content-Type':'application/json'}, body: JSON.stringify(dadosLivro)})

    let dados = response.json()
    setCreateCard(dadosLivro)
    console.log(dadosLivro)
}
//Altera um livro
const putLivro = function(){}
//Deleta um livro
const delLivro = function(){}
//Lista os livros
const getLivros = function(){}
//Busca de Livro por ID
const getIdLivro = function(){}

botaoSalvar.addEventListener('click', function(){
    //postLivro()
    let dados = getDadosForm()

    if(dados){
        postLivro(dados)
    }
})