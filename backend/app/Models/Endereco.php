<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Endereco extends Model
{

    const CREATED_AT = 'Data_Cadastro';
    const UPDATED_AT = 'Data_Modificacao';


    protected $primaryKey = 'ID';
    protected $table = 'enderecos';
    protected $fillable = [
        'ID',
        'Cidade_ID',
        'CEP',
        'Logradouro',
        'Complemento',
        'Bairro',
        'Data_Cadastro',
        'Data_Modificacao'
    ];

    public $timestamps = true;


    public function cidade()
    {

        return $this->belongsTo('App\Models\Cidade', 'Cidade_ID');


    }

    /**
     * @param string $cep
     * @return mixed
     */
    public static function endereco(string $cep)
    {
        return self::with('cidade.estado')
            ->where('CEP', str_replace('-', '', $cep))
            ->get()
            ->first();
    }


}
