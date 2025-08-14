#!/usr/bin/env python3
"""
Function that updates all topics of a school document based on its name.
"""


def update_topics(mongo_collection, name, topics):
    """
    Update the 'topics' field of all documents in the collection matching the given school name.

    Args:
        mongo_collection (pymongo.collection.Collection): The MongoDB collection to update.
        name (str): The name of the school to update.
        topics (list of str): The new list of topics to set.

    Returns:
        None
    """
    new = mongo_collection.update_many({"name": name}, {"$set": {"topics": topics}})
    return new
