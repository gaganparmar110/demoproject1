import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import QuillEditor from "./Styles/editor.style";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.core.css";
import ApiHandler from "Helpers/ApiHandler";
import LoaderGif from "Assets/Images/loading.gif";

const FontStyle = Quill.import("attributors/style/font");

Quill.register(FontStyle, true);

export default class Editor extends Component {
	imageHandler() {
		const input = document.createElement("input");

		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");
		input.click();

		input.onchange = async () => {
			const file = input.files[0];
			const formData = new FormData();

			formData.append("image", file);

			// SAVE CURRENT CURSOR STATE
			const range = this.quill.getSelection(true);

			// INSERT TEMPORARY LOADING PLACEHOLDER IMAGE
			this.quill.insertEmbed(range.index, "image", LoaderGif);

			// MOVE CURSOR TO RIGHT SIDE OF IMAGE (EASIER TO CONTINUE TYPING)
			this.quill.setSelection(range.index + 1);

			const res = await new ApiHandler().post("editor/images", {
				data: formData,
			});

			// REMOVE PLACEHOLDER IMAGE
			this.quill.deleteText(range.index, 1);

			// INSERT UPLOADED IMAGE
			this.quill.insertEmbed(range.index, "image", res.location);
		};
	}

	render() {
		const options = {
			theme: "snow",
			placeholder: "Write Something",
			value: this.props.value,
			onChange: (content) => {
				this.props.onChange(content);
			},
			modules: {
				toolbar: {
					container: [
						[
							{ header: [1, 2, 3, 4, 5, 6, false] },
							// { font: [] }
						],
						[{ color: [] }, { background: [] }],
						["bold", "italic", "underline", "strike", "blockquote"],
						[{ script: "sub" }, { script: "super" }],
						[
							{ list: "ordered" },
							{ list: "bullet" },
							{ indent: "-1" },
							{ indent: "+1" },
						],
						// ['link', 'image', 'video'],
						["image"],
						["clean"],
					],
					handlers: {
						image: this.imageHandler,
					},
				},
			},
		};

		return (
			<QuillEditor>
				<ReactQuill
					ref={(el) => {
						this.quill = el;
					}}
					{...options}
				/>
			</QuillEditor>
		);
	}
}
