/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/lost_found_dapp.json`.
 */
export type LostFoundDapp = {
  "address": "3wH477PFXiqmei2cvxZiTrLescHPZ5xp5AUuPhP6eFJc",
  "metadata": {
    "name": "lostFoundDapp",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "approveClaim",
      "discriminator": [
        74,
        228,
        211,
        63,
        140,
        255,
        69,
        210
      ],
      "accounts": [
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "lostItem"
          ]
        },
        {
          "name": "lostItem",
          "writable": true
        },
        {
          "name": "claim",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  108,
                  97,
                  105,
                  109
                ]
              },
              {
                "kind": "account",
                "path": "lostItem"
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "cancelListing",
      "discriminator": [
        41,
        183,
        50,
        232,
        230,
        233,
        157,
        70
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "lostItem"
          ]
        },
        {
          "name": "lostItem",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "confirmReceived",
      "discriminator": [
        185,
        220,
        54,
        84,
        188,
        173,
        87,
        164
      ],
      "accounts": [
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "lostItem"
          ]
        },
        {
          "name": "lostItem",
          "writable": true
        },
        {
          "name": "finder",
          "writable": true
        },
        {
          "name": "claim",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  108,
                  97,
                  105,
                  109
                ]
              },
              {
                "kind": "account",
                "path": "lostItem"
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "initializeLostItem",
      "discriminator": [
        1,
        249,
        120,
        27,
        89,
        197,
        214,
        187
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "lostItem",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  111,
                  115,
                  116,
                  95,
                  105,
                  116,
                  101,
                  109
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "arg",
                "path": "itemId"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "itemId",
          "type": "u64"
        },
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "category",
          "type": "string"
        },
        {
          "name": "lastSeenLocation",
          "type": "string"
        },
        {
          "name": "imageUrl",
          "type": "string"
        },
        {
          "name": "rewardLamport",
          "type": "u64"
        }
      ]
    },
    {
      "name": "rejectClaim",
      "discriminator": [
        238,
        185,
        227,
        8,
        51,
        188,
        35,
        182
      ],
      "accounts": [
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "lostItem"
          ]
        },
        {
          "name": "lostItem",
          "writable": true
        },
        {
          "name": "finder",
          "writable": true
        },
        {
          "name": "claim",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  108,
                  97,
                  105,
                  109
                ]
              },
              {
                "kind": "account",
                "path": "lostItem"
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "submitRecoveryClaim",
      "discriminator": [
        68,
        162,
        238,
        168,
        26,
        67,
        73,
        63
      ],
      "accounts": [
        {
          "name": "finder",
          "writable": true,
          "signer": true
        },
        {
          "name": "lostItem",
          "writable": true
        },
        {
          "name": "claim",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  108,
                  97,
                  105,
                  109
                ]
              },
              {
                "kind": "account",
                "path": "lostItem"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "imageUrl",
          "type": "string"
        },
        {
          "name": "foundLocation",
          "type": "string"
        },
        {
          "name": "message",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "lostItem",
      "discriminator": [
        214,
        67,
        108,
        116,
        34,
        20,
        71,
        202
      ]
    },
    {
      "name": "recoveryClaim",
      "discriminator": [
        254,
        124,
        75,
        93,
        170,
        80,
        41,
        122
      ]
    }
  ],
  "types": [
    {
      "name": "itemStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "open"
          },
          {
            "name": "claimSubmitted"
          },
          {
            "name": "readyForPickUp"
          },
          {
            "name": "completed"
          },
          {
            "name": "cancelled"
          }
        ]
      }
    },
    {
      "name": "lostItem",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "finder",
            "type": "pubkey"
          },
          {
            "name": "itemId",
            "type": "u64"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "category",
            "type": "string"
          },
          {
            "name": "lastSeenLocation",
            "type": "string"
          },
          {
            "name": "imageUrl",
            "type": "string"
          },
          {
            "name": "rewardLamports",
            "type": "u64"
          },
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "itemStatus"
              }
            }
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "recoveryClaim",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lostItem",
            "type": "pubkey"
          },
          {
            "name": "finder",
            "type": "pubkey"
          },
          {
            "name": "imageUrl",
            "type": "string"
          },
          {
            "name": "foundLocation",
            "type": "string"
          },
          {
            "name": "message",
            "type": "string"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
