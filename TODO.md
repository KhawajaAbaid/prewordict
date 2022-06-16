    (A) #Add Randomization for the image that is displayed.    {cm:2022-06-16}
    (B) Develop the rest of word clouds
    (C) Add script for input-target cloud similarity score as response
    (D) Okay so, the above thing may not be possible. 
        Now that i think about it, there's no way to calculate similarity with mere dot product between
        a single word vector and vector of all the words in the given space or word cloud.
        I mean sure, we can measure similarity between two sentences but apply the same method for a
        sentence and a word doesn't seem like would work.
            ## BUT
                what could work is that, we could calculate word embeddings for each batch
                and then calculate the similaity between a given word and cluster of words.
                Or calculate embeddings for each cluster and then use that to calculate similarity.
                i'm not sure at this point.