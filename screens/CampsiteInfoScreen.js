import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { COMMENTS } from '../shared/comments';
import RenderCampsite from '../features/campsites/RenderCampsite';

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const [comments, setComments] = useState(COMMENTS);
    const [favorite, setFavorite] = useState(false); // Added state for favorite

    const renderCommentItem = ({ item }) => {
        return (
            <View style={styles.commentItem}>
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
                <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
                <Text style={{ fontSize: 12 }}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    return (
        <FlatList
            data={comments.filter((comment) => comment.campsiteId === campsite.id)}
            renderItem={renderCommentItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ marginHorizontal: 20, paddingVertical: 20 }}
            ListHeaderComponent={
                <>
                    <RenderCampsite
                        campsite={campsite}
                        isFavorite={favorite} // Passed isFavorite prop
                        markFavorite={() => setFavorite(true)} // Passed markFavorite prop
                    />
                    <Text style={styles.commentsTitle}>Comments</Text>
                </>
            }
        />
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
        marginTop: 20,
    },
});

export default CampsiteInfoScreen;
