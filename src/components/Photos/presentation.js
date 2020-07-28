import React from 'react';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import CardColumns from 'react-bootstrap/CardColumns';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { updateIcon, deleteIcon } from '../../services/icons';
import { loadingImageUrl } from '../../services/consts';
import PhotoModal from '../PhotoModal';

const Presentation = props => {
	const cards = props.photos.map((photo, index) => {
		const title =
			props.isUpdating === index || props.isDeleting === index
				? 'Updating ...'
				: photo.title;
		const url =
			props.isUpdating === index || props.isDeleting === index
				? loadingImageUrl
				: photo.url;
		const isDisabled = props.isUpdating === index || props.isDeleting === index;

		return (
			<Card key={index}>
				<Card.Img
					variant='top'
					src={url}
					alt={`Invalid Url for Image #${photo.id}`}
				/>
				<Card.Body>
					<Card.Text>{title}</Card.Text>
					<ButtonGroup>
						<OverlayTrigger
							placement='bottom'
							overlay={<Tooltip>Update the Card</Tooltip>}
						>
							<Button
								variant='outline-info'
								onClick={props.onUpdateFormOpen(photo, index)}
								disabled={isDisabled}
							>
								{updateIcon}
							</Button>
						</OverlayTrigger>

						<OverlayTrigger
							placement='bottom'
							overlay={<Tooltip>Delete the Card</Tooltip>}
						>
							<Button
								variant='outline-danger'
								onClick={props.onCardDelete(photo, index)}
								disabled={isDisabled}
							>
								{deleteIcon}
							</Button>
						</OverlayTrigger>
					</ButtonGroup>
				</Card.Body>
			</Card>
		);
	});

	let render;
	if (props.isLoadingAlbum === true) render = <div>loading</div>;
	else if (props.isLoadingAlbum === false && cards.length <= 0)
		render = (
			<Alert show={true} variant='danger'>
				<Alert.Heading>This is an Invalid Album</Alert.Heading>
				<p>
					Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
					lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
					fermentum.
				</p>
			</Alert>
		);
	else
		render = (
			<React.Fragment>
				<CardColumns>{cards}</CardColumns>
				<Button variant='primary' onClick={props.onCreateFormOpen}>
					Create a New Card
				</Button>
			</React.Fragment>
		);

	return (
		<React.Fragment>
			<Jumbotron>
				<Button as={Link} to='/' variant='dark' className='mb-4'>
					Go back to Home
				</Button>
				{render}
			</Jumbotron>

			<PhotoModal
				photo={props.updateFormPhoto}
				show={props.updateFormPhoto !== null}
				handleClose={props.onUpdateFormClose}
				handleSubmit={props.onUpdateFormSubmit}
			/>
			<PhotoModal
				show={props.createFormShow}
				handleClose={props.onCreateFormClose}
				handleSubmit={props.onCreateFormSubmit}
			/>
		</React.Fragment>
	);
};

export default Presentation;
