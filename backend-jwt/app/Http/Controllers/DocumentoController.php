<?php

namespace App\Http\Controllers;

use App\Models\Documentos;
use Illuminate\Http\Request;

class DocumentoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Documentos::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        return Documentos::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Documentos::findOrFail($id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id_curso
     * @param  int  $id_documento
     * @return \Illuminate\Http\Response
     */
    public function findByCourse($id_curso, $id_documento)
    {
        if($id_documento == 1){
            return Documentos::select('id')
            ->where('id_curso', $id_curso)
            ->where('id', '=', $id_documento)
            ->first();
        } else {
            return Documentos::select('id')
            ->where('id_curso', $id_curso)
            ->where('id', '<', $id_documento)
            ->orderBy('id', 'desc')
            ->first();
        }
    }
    
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        return Documentos::find($id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Documentos::findOrFail($id)->delete();
    }
}
