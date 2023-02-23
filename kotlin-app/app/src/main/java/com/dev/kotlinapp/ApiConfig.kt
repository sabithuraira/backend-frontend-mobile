package com.dev.kotlinapp

import com.google.gson.Gson
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class ApiConfig {
    companion object{
        const val baseUrl = "http://192.168.100.185:3000/"

        fun getApiService(): ApiInterface{
            val retrofit = Retrofit.Builder().baseUrl(baseUrl)
                .addConverterFactory(GsonConverterFactory.create())
                .build()

            return retrofit.create((ApiInterface::class.java))
        }
    }
}