<?php


namespace App\Http\Controllers;

use App\Models\Endereco;
use App\Models\Estado;
use Dotenv\Validator;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
use mysql_xdevapi\Exception;
use Symfony\Component\HttpFoundation\Response;

class EnderecoController extends BaseController
{
    /**
     * @var Endereco
     */
    private $model;

    public function __construct(Endereco $endereco)
    {
        $this->model = $endereco;
    }



    public function getAll()
    {
        $enderecos = $this->model->with('cidade.estado')->get();

        try {

            if ($enderecos->count() > 0) {
                return response()->json($enderecos, Response::HTTP_OK);
            } else {
                return response()->json($enderecos, Response::HTTP_OK);
            }

        } catch (QueryException $e) {
            return response()->json(['error' => 'Erro de conexão com o banco de dados'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }


    }

    public function get($id)
    {
        try {
            $endereco = $this->model->with('cidade.estado')->findOrFail($id);

            return response()->json($endereco);

        } catch (QueryException $e) {

            return response()->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e){

            return response()->json(['error' => 'Endereço não encontrado'], Response::HTTP_NOT_FOUND);
        }
    }

    public function store(Request $request)
    {
        try {

            $endereco = $this->model->create($request->all());
            return response()->json($endereco, Response::HTTP_CREATED);
        } catch (QueryException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            return response()->json(['erro' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        }
    }

    public function update($id, Request $request)
    {
        try {
            $endereco = $this->model->find($id);
            if($request->Logradouro){
                $endereco->Logradouro = $request->Logradouro;
            }

            if ($request->Complemento) {
                $endereco->Complemento = $request->Complemento;
            }

            if ($request->Bairro) {
                $endereco->Bairro = $request->Bairro;
            }

            $endereco->save();

            return response()->json($endereco, Response::HTTP_CREATED);
        } catch (QueryException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Endereço não encontrado'], Response::HTTP_NOT_FOUND);
        }
    }

    public function destroy($id)
    {

        try {

            $endereco = $this->model->find($id)->delete();

            return response()->json($endereco, Response::HTTP_OK);

        } catch (QueryException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }
}
