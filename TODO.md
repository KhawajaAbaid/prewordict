### Disclaimer: 
*The conetents of this file are highly classified and peronalized. Please keep in mind that I've written here things as I've thought of them on the fly. And as you'll see, I write down things like I'm explaining them to a group of friends working on this project (i wish i had friends like that :'( ) - well not exactly like that but kind of like that :p.*

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

### OKAY OKAY OKAY! I just thought of this idea on how to calculate word similairty.
        
Spoiler alert: it involves manual labeling

        So the idea is that, 

        i- For now, save the words that belong to each cluster in a file.
        
        ii- Here's the most important step:
            Label each cluster with a category name after studying its word cloud image/words that you think it belongs. That has to be done manually. There's no way around it, or it's how this feels like right now. But regardless it should be  easy enough, though time consuming.
        
        iii- Create a one-hot enconding of all the words in a single cluster for each cluster.
        
        iv- Assign each one hotted vector a category id, i.e. the category we assigned to the cluster to which this vector belongs.

        v- Use dense or lstm layers to train a multilabel classification model.


        vi- Since we'll have top 100 words (probably should lower it tbh) as the pool of possible answers, and user has to guess one of them. But each cluster would contain a lot more words than that. So, when the user enters a word, if the word is in our vocabulary we'll have a caluclated score, and display it accordingly. Otherwise we can display a message saying or something like your guess is way to far or not close or something.


### OR OR OR, check this,
though the above solution would work fine, and though it would produce probibility score of a word belonging to a cluster, but let's ask ourselves, do we really need that score? I think not. And here's my alternative, way qucik to implement and simple method to achieve what we oringinal planned on achieving:

Like i said, each cluster has many words, way more than the 100 (let's honestly cut it down to 50) words possible pool of answers that the user can guess. So, we can save all those words, sorted by their tfidf score, (excluding the top 50 because they're the answers obviously) in a file. And load that in javascript, and if the user's guess is within top 10% of the words in that file, display "Almost", if it's within say 50%, display "Close", if it's not within either of previous bounds, but in the list, display "You're thinking the right way or your mind is on the right path" or something along this. And if the guess is NOT in the list, we display "Not even close".