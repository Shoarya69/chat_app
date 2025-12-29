from fastapi import APIRouter
from app.mogodatabase import mongo

clean = APIRouter()

@clean.post("/api/clean")
async def clean_mongo():
    try:
        result = await mongo.user_n.update_many(
            {},
            [
                {
                    "$set": {
                        "friend_request_id": {
                            "$setUnion": ["$friend_request_id", []]
                        },
                        "frined_request": {
                            "$setUnion": ["$frined_request", []]
                        }
                    }
                }
            ]
        )

        return {
            "status": "cleaned",
            "matched": result.matched_count,
            "modified": result.modified_count
        }
    except Exception as e:
        print(e)
        return{"errror": "Somting went wrong"}


@clean.post("/api/clean2")
async def clean2():
    try:
        result = await mongo.user_n.update_many(
            {},
            [
                {
                    "$set": {
                        "friend_requests": {
                            "$map": {
                                "input": {
                                    "$range": [
                                        0,
                                        { "$size": "$friend_request_id" }
                                    ]
                                },
                                "as": "i",
                                "in": {
                                    "id": {
                                        "$arrayElemAt": [
                                            "$friend_request_id",
                                            "$$i"
                                        ]
                                    },
                                    "username": {
                                        "$arrayElemAt": [
                                            "$frined_request",
                                            "$$i"
                                        ]
                                    }
                                }
                            }
                        }
                    }
                },
                {
                    "$unset": [
                        "friend_request_id",
                        "frined_request"
                    ]
                }
            ]
        )

        return {
            "status": "ok",
            "modified_docs": result.modified_count
        }

    except Exception as e:
        print(e)
        return {"error": "Something went wrong"}
