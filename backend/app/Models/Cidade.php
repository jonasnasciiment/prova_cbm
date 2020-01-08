<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cidade extends Model {
    protected $primaryKey = 'ID';
    protected $table = 'cidades';
    protected $fillable = [
        'ID',
        'Estado_ID',
        'Cidade'

    ];

    public $timestamps = false;

    public function endereco() {
        return $this->hasMany('App\Models\Endereco');
    }

    public function estado() {
        return $this->belongsTo('App\Models\Estado','Estado_ID');
    }

    public static function cidade(string $ibge){
        return self::find($ibge);
    }

}
