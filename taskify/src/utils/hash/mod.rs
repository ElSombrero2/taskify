use sha1_smol::Sha1;

pub fn hash (str: String) -> String {
    let mut hasher = Sha1::new();
    hasher.update(str.as_bytes());
    String::from(&hasher.digest().to_string()[..10])
}
