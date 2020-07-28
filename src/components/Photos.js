import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import CardColumns from 'react-bootstrap/CardColumns';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import JsonPlaceholder from '../apis/JsonPlaceholder';
import { updateIcon, deleteIcon } from '../services/icons';

import PhotoModal from './PhotoModal';

const Photos = ({ match }) => {
	const [photos, setPhotos] = useState([]);
	const [updateFormPhoto, setUpdateFormPhoto] = useState(null);
	const [createFormShow, setCreateFormShow] = useState(false);

	useEffect(() => {
		JsonPlaceholder.get('/photos', {
			params: { albumId: match.params.id },
		}).then(res => {
			console.groupCollapsed(`New Photos with Album Id : ${match.params.id}`);
			console.log(res.data);
			console.groupEnd();
			setPhotos(res.data);
		});
	}, [match.params.id]);

	const onCreateFormOpen = () => {
		setCreateFormShow(true);
	};

	const onCreateFormClose = () => {
		setCreateFormShow(false);
	};

	const onCreateFormSubmit = (title, url) => {
		setCreateFormShow(false);
		JsonPlaceholder.post('/photos', {
			title,
			url,
		}).then(({ data }) => {
			setPhotos(prev => [...prev, data]);
		});
	};

	const onCardDelete = delPhoto => () => {
		JsonPlaceholder.delete(`/photos/${delPhoto.id}`).then(() => {
			setPhotos(prevPhotos => prevPhotos.filter(photo => photo.id !== delPhoto.id));
		});
	};

	const onUpdateFormOpen = photo => () => {
		setUpdateFormPhoto(photo);
	};

	const onUpdateFormClose = () => {
		setUpdateFormPhoto(null);
	};

	const onUpdateFormSubmit = (title, url) => {
		setUpdateFormPhoto(null);
		JsonPlaceholder.patch(`/photos/${updateFormPhoto.id}`, {
			title,
			url,
		}).then(({ data }) => {
			setPhotos(prev => prev.map(photo => (photo.id === data.id ? data : photo)));
		});
	};

	const cards = photos.map((photo, index) => (
		<Card key={index}>
			<Card.Img
				variant='top'
				src={photo.url}
				alt={`Invalid Url for Image #${photo.id}`}
			/>
			<Card.Body>
				<Card.Text>{photo.title}</Card.Text>
				<ButtonGroup>
					<OverlayTrigger
						placement='bottom'
						overlay={<Tooltip>Update the Card</Tooltip>}
					>
						<Button variant='warning' onClick={onUpdateFormOpen(photo)}>
							{updateIcon}
						</Button>
					</OverlayTrigger>

					<OverlayTrigger
						placement='bottom'
						overlay={<Tooltip>Delete the Card</Tooltip>}
					>
						<Button variant='danger' onClick={onCardDelete(photo)}>
							{deleteIcon}
						</Button>
					</OverlayTrigger>
				</ButtonGroup>
			</Card.Body>
		</Card>
	));

	return (
		<React.Fragment>
			<Jumbotron>
				<ButtonGroup className='mb-4'>
					<Button as={Link} to='/' variant='dark'>
						Go back to Home
					</Button>
					<Button variant='primary' onClick={onCreateFormOpen}>
						Create a New Card
					</Button>
				</ButtonGroup>
				<CardColumns>{cards}</CardColumns>
			</Jumbotron>

			<PhotoModal
				photo={updateFormPhoto}
				show={updateFormPhoto !== null}
				handleClose={onUpdateFormClose}
				handleSubmit={onUpdateFormSubmit}
			/>
			<PhotoModal
				show={createFormShow}
				handleClose={onCreateFormClose}
				handleSubmit={onCreateFormSubmit}
			/>
		</React.Fragment>
	);
};

export default Photos;
