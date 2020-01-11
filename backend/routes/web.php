<?php

/**
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|


*/
/**  /@var Route $router */
use Illuminate\Support\Facades\Route;




$router->get("/api/enderecos", "EnderecoController@getAll");

$router->group(['prefix' => "/api/endereco"], function() use ($router){
    $router->get("/busca/{cep}", "CepController@getCep");
    $router->get("/{id}", "EnderecoController@get");
    $router->post("/", "EnderecoController@store");
    $router->put("/{id}", "EnderecoController@update");
    $router->delete("/{id}", "EnderecoController@destroy");
});



