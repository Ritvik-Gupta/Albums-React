import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const PhotoModal = ({ photo = null, show, handleClose, handleSubmit }) => {
	const [inputTitle, setInputTitle] = useState('');
	const [inputUrl, setInputUrl] = useState('');

	useEffect(() => {
		if (show === true && photo !== null) {
			setInputTitle(photo.title);
			setInputUrl(photo.url);
		} else {
			setInputTitle('');
			setInputUrl('');
		}
	}, [photo, show]);

	const onTitleChange = ({ target: { value } }) => {
		setInputTitle(value);
	};

	const onUrlChange = ({ target: { value } }) => {
		setInputUrl(value);
	};

	const onFormSubmit = () => {
		handleSubmit({ title: inputTitle, url: inputUrl });
	};

	return (
		<Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
			<Modal.Header closeButton>
				<Modal.Title>Update Form</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group>
					<Form.Label>Card Title</Form.Label>
					<Form.Control
						type='text'
						value={inputTitle}
						placeholder='Card Title ...'
						onChange={onTitleChange}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Card Url</Form.Label>
					<Form.Control
						type='text'
						value={inputUrl}
						placeholder='Image Url ...'
						onChange={onUrlChange}
					/>
					<Form.Text className='text-muted'>Paste an Image Url over here</Form.Text>
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='primary' onClick={onFormSubmit}>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default PhotoModal;
