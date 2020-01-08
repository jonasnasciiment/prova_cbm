<?php

namespace App\Http\Controllers;

use App\Models\Estado;
use App\Models\Cidade;
use App\Models\Endereco;
use Exception;

class CepController extends Controller
{


    public function __construct()
    {
        //
    }

    public function getCep($cep)
    {
        try {
            $endereco = Endereco::endereco($cep);
            if (empty($endereco)) {
                $cepObj = $this->getViaCep($cep);
                $estado = Estado::estado($cepObj->ibge);
                $cidade = Cidade::cidade($cepObj->ibge);
                if ($estado == null) {
                    Estado::create(['ID' => substr($cepObj->ibge, 0, 2), 'UF' => $cepObj->uf]);
                    Cidade::create(['ID' => $cepObj->ibge, 'Estado_ID' => $estado->ID, 'Cidade' => $cepObj->localidade]);
                } elseif ($cidade == null){
                    Cidade::create(['ID' => $cepObj->ibge, 'Estado_ID' => $estado->ID, 'Cidade' => $cepObj->localidade]);
                }
                Endereco::create(
                    [
                        'Cidade_ID' => $cidade->ID,
                        'CEP' => str_replace('-', '', $cepObj->cep),
                        'Logradouro' => $cepObj->logradouro,
                        'Complemento' => $cepObj->complemento,
                        'Bairro' => $cepObj->bairro
                    ]);
                return response()->json(Endereco::endereco($cep));
            } else {
                return response()->json($endereco);
            }
        } catch (Exception $e) {
            return $e;
        }
    }

    /**
     * @param string $cep
     * @return false|string
     * @throws Exception
     */
    private function getViaCep(string $cep)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "http://viacep.com.br/ws/{$cep}/json/",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_POSTFIELDS => "",
        ));
        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);
        if (empty($err)) {
            return json_decode($response);
        } else {
            throw new Exception($err);
        }
    }
}
