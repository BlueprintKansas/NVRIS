#!/usr/bin/env perl

use strict;
use warnings;

sub run_it {
    my ($cmd) = @_;
    print "$cmd\n";
    system($cmd) and die "$cmd failed: $!";
}

my %tests = (
    'test-vr-en-payload.json'       => '/vr/en',
    'test-vr-en-nosig-payload.json' => '/vr/en',
    'test-ab-en-payload.json'       => '/av/ksav1',
);

for my $payload ( sort keys %tests ) {
    ( my $png = $payload ) =~ s/\.json/.png/;
    my $path = $tests{$payload};
    my $tmp  = "$payload-out.json";
    run_it(
        qq{curl -s -XPOST -H 'Content-Type: application/json' --data \@$payload http://localhost:4500/dev$path > $tmp}
    );
    run_it(
        qq{jq .img < $tmp | perl -n -e 's/"data:image\\/png;base64,|"//g; print' | base64 -D > $png}
    );
    print "PNG saved in $png\n";
}
