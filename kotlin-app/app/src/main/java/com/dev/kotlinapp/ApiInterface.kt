package com.dev.kotlinapp

import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.http.*

interface ApiInterface {
    @GET("todo")
    fun todos() : Call<List<Todo>>

    @POST("todo")
    fun storeTodo(@Body params: RequestBody) : Call<Todo>

    @PATCH("todo/{id}")
    fun updateTodo(@Path("id") id: String, @Body params: RequestBody) : Call<String>

    @DELETE("todo/{id}")
    fun deleteTodo(@Path("id") id: String) : Call<String>
}