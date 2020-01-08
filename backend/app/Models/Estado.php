<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Estado extends Model {


    protected $primaryKey = 'ID';
    protected $table = 'estados';
    protected $fillable = [
        'ID',
        'UF'

    ];



    public $timestamps = false;

    public function cidade() {
        return $this->hasMany('App\Models\Cidade');
    }

    public static function estado(string $ibge) {
        return self::find(substr($ibge, 0, 2)); //verificando se existe estado na base de dados
    }
}
