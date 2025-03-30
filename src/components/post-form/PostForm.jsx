import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        try {
            let fileId = post?.featuredimage;

            if (data.image && data.image.length > 0) {
                const file = await appwriteService.uploadFile(data.image[0]);
                if (file) {
                    fileId = file.$id;
                    console.log("Uploaded file ID:", fileId);

                    if (post?.featuredimage) {
                        await appwriteService.deleteFile(post.featuredimage);
                    }
                } else {
                    throw new Error("File upload failed.");
                }
            }

            if (post) {
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredimage: fileId,
                });

                if (dbPost) navigate(`/post/${dbPost.$id}`);
            } else {
                if (!fileId) {
                    throw new Error("Featured image is required for new posts.");
                }

                const dbPost = await appwriteService.createPost({
                    ...data,
                    userid: userData.$id,
                    featuredimage: fileId,
                });

                if (dbPost) navigate(`/post/${dbPost.$id}`);
            }
        } catch (error) {
            console.error("Error submitting post:", error.message);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap font-[Comic Sans MS] text-white bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600 p-6 border-4 border-white shadow-[4px_4px_0px_#ffcc00] rounded-lg">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Enter your cool title..."
                    className="mb-4 bg-gray-800 text-white border-2 border-yellow-300 rounded-lg px-3 py-2"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="your-awesome-post"
                    className="mb-4 bg-gray-800 text-white border-2 border-yellow-300 rounded-lg px-3 py-2"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 bg-gray-800 text-white border-2 border-yellow-300 rounded-lg px-3 py-2"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg border-4 border-white"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 bg-gray-800 text-white border-2 border-yellow-300 rounded-lg px-3 py-2"
                    {...register("status", { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : "bg-yellow-300"}
                    className="w-full text-lg font-bold text-black border-2 border-white px-4 py-2 rounded-md shadow-lg hover:bg-yellow-400 transition"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
