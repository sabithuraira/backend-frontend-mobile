package com.dev.kotlinapp

import kotlinx.parcelize.Parcelize
import android.os.Parcelable
import com.google.gson.annotations.SerializedName

@Parcelize
data class TodoResponse(
	@field:SerializedName("TodoResponse")
	val todoResponse: List<Todo?>? = null
) : Parcelable

@Parcelize
data class Todo(
	@field:SerializedName("createdAt")
	val createdAt: String? = null,

	@field:SerializedName("description")
	val description: String? = null,

	@field:SerializedName("id")
	val id: Int? = null,

	@field:SerializedName("title")
	val title: String? = null,

	@field:SerializedName("updatedAt")
	val updatedAt: String? = null
) : Parcelable
