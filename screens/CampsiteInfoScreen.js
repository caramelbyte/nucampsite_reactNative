import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, Modal, Button } from 'react-native';
import { Input, Rating } from 'react-native-elements';
import { useDispatch } from 'react-redux'; 
import { postComment } from './commentsSlice'; 
import { COMMENTS } from '../shared/comments';
import RenderCampsite from '../features/campsites/RenderCampsite';

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const [comments, setComments] = useState(COMMENTS);
    const [showModal, setShowModal] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');

    // Initialize dispatch
    const dispatch = useDispatch();

    const renderCommentItem = ({ item }) => {
        return (
            <View style={styles.commentItem}>
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
                <Rating 
                    imageSize={10} 
                    readonly 
                    startingValue={item.rating} 
                    style={{ alignItems: 'flex-start', paddingVertical: '5%' }} 
                />
                <Text style={{ fontSize: 12 }}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    const markFavorite = () => {
        setIsFavorite(true);
    };

    const handleCommentSubmit = () => {
        const newComment = {
            rating,
            author,
            text,
            campsiteId: campsite.id,
        };
        // Dispatch the postComment action with the newComment object
        dispatch(postComment(newComment));
        setShowModal(!showModal);
        resetForm();
    };

    const resetForm = () => {
        setRating(5);
        setAuthor('');
        setText('');
    };

    return (
        <>
            {/* FlatList and Modal components unchanged */}
        </>
    );
};



export default CampsiteInfoScreen;
