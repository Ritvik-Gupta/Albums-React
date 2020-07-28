import React, { useState, useEffect } from 'react';

import JsonPlaceholder from '../../apis/JsonPlaceholder';
import Presentation from './presentation';

const Photos = props => {
	const [photos, setPhotos] = useState([]);
	const [updateFormPhoto, setUpdateFormPhoto] = useState(null);
	const [isUpdating, setIsUpdating] = useState(null);
	const [createFormShow, setCreateFormShow] = useState(false);
	const [isDeleting, setIsDeleting] = useState(null);
	const [isLoadingAlbum, setIsLoadingAlbum] = useState(false);

	useEffect(() => {
		setIsLoadingAlbum(true);
		JsonPlaceholder.get('/photos', {
			params: { albumId: props.match.params.id },
		}).then(res => {
			console.groupCollapsed(`New Photos with Album Id : ${props.match.params.id}`);
			console.log(res.data);
			console.groupEnd();
			setPhotos(res.data);
			setIsLoadingAlbum(false);
		});
	}, [props.match.params.id]);

	const createHandlers = {
		onCreateFormOpen: () => {
			setCreateFormShow(true);
		},

		onCreateFormClose: () => {
			setCreateFormShow(false);
		},

		onCreateFormSubmit: formData => {
			setCreateFormShow(false);
			JsonPlaceholder.post('/photos', formData).then(({ data }) => {
				setPhotos(prev => [...prev, data]);
			});
		},
	};

	const deleteHandlers = {
		onCardDelete: (delPhoto, index) => () => {
			setIsDeleting(index);
			JsonPlaceholder.delete(`/photos/${delPhoto.id}`).then(() => {
				setPhotos(prevPhotos =>
					prevPhotos.filter(photo => photo.id !== delPhoto.id)
				);
				setIsDeleting(null);
			});
		},
	};

	const updateHandlers = {
		onUpdateFormOpen: (photo, index) => () => {
			setUpdateFormPhoto(photo);
			setIsUpdating(index);
		},

		onUpdateFormClose: () => {
			setUpdateFormPhoto(null);
			setIsUpdating(null);
		},

		onUpdateFormSubmit: formData => {
			setUpdateFormPhoto(null);
			JsonPlaceholder.patch(`/photos/${updateFormPhoto.id}`, formData).then(
				({ data }) => {
					setPhotos(prevPhotos =>
						prevPhotos.map(photo => (photo.id === data.id ? data : photo))
					);
					setIsUpdating(null);
				}
			);
		},
	};

	return (
		<Presentation
			photos={photos}
			updateFormPhoto={updateFormPhoto}
			isUpdating={isUpdating}
			createFormShow={createFormShow}
			isDeleting={isDeleting}
			isLoadingAlbum={isLoadingAlbum}
			{...createHandlers}
			{...deleteHandlers}
			{...updateHandlers}
		/>
	);
};

export default Photos;
