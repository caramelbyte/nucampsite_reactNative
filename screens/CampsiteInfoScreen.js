import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, Modal, Button } from 'react-native';
import { COMMENTS } from '../shared/comments';
import RenderCampsite from '../features/campsites/RenderCampsite';

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const [comments, setComments] = useState(COMMENTS);
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [isFavorite, setIsFavorite] = useState(false); // Added state for tracking favorite

    const renderCommentItem = ({ item }) => {
        return (
            <View style={styles.commentItem}>
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
                <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
                <Text style={{ fontSize: 12 }}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    const markFavorite = () => {
        setIsFavorite(true);
    };

    return (
        <>
            <FlatList
                data={comments.filter((comment) => comment.campsiteId === campsite.id)}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ marginHorizontal: 20, paddingVertical: 20 }}
                ListHeaderComponent={
                    <>
                        <RenderCampsite
                            campsite={campsite}
                            isFavorite={isFavorite}
                            markFavorite={markFavorite}
                            onShowModal={() => setShowModal(!showModal)} // Passing showModal toggle function
                        />
                        <Text style={styles.commentsTitle}>Comments</Text>
                    </>
                }
            />
            <Modal
                animationType="slide"
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(!showModal)}
            >
                <View style={styles.modal}>
                    <View style={{ margin: 10 }}>
                        <Button
                            onPress={() => setShowModal(!showModal)}
                            color="#808080"
                            title="Cancel"
                        />
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    commentItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    commentsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20, // Completed the missing value
    },
    modal: {
        justifyContent: 'center',
        margin: 20, // Define modal styling
    },
});

export default CampsiteInfoScreen;
